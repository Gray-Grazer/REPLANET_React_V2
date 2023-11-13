import React, { useEffect, useState } from "react";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import DOMPurify from "dompurify";
import '../../../assets/css/draft.css';

export function TextEditor({ onContentChange, uploadImageCallback, existingReviewDescription }) {
  const [description, setDescription] = useState(() => {
    if (existingReviewDescription) {
      const contentBlock = convertFromHTML(existingReviewDescription);
      const contentState = ContentState.createFromBlockArray(contentBlock);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  });
  
  const [previewVisible, setPreviewVisible] = useState(false);
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    const contentState = description.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const html = draftToHtml(rawContentState);

    // Call the callback function to send the HTML content back to the parent component
    onContentChange(html);

    setConvertedContent(html);
  }, [description]);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  const togglePreview = (event) => {
    event.preventDefault();
    setPreviewVisible(!previewVisible);
  };

  return (
    <div className="draft">
      <button onClick={togglePreview} className={`bookmark-button ${previewVisible ? "active" : ""}`}>
        {previewVisible ? "Close Preview" : "Show Preview"}
      </button>
      {previewVisible ? (
        <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
      ) : (
        <div className="editor-container">
          <Editor
            editorState={description}
            onEditorStateChange={setDescription}
            toolbar={{
              options: ['blockType', 'textAlign', 'list', 'fontSize', 'inline', 'colorPicker', 'emoji', 'image', 'remove', 'history'],
              inline: { inDropdown: false },
              list: { inDropdown: true },
              textAlign: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: true },
              image: { uploadCallback: uploadImageCallback, alt: { present: true, mandatory: true }},
            }}
            localization={{
              locale: 'ko',
            }}
          />
        </div>
      )}
    </div>
  );
}
