import { useState } from "react";

function Summary({ isTrans, transcript }) {
  const [notfi, setNotfi] = useState(false);

  const textToCopy = transcript;

  const copyToClipboard = () => {
    setNotfi(true);
    setTimeout(() => {
      setNotfi(false);
    }, 3000);

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  };

  return (
    <>
      {notfi ? (
        <div
          id="toast-top-right"
          className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x rtl:divide-x-reverse divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800"
          role="alert"
        >
          <div className="text-sm text-green-500 font-bold">Text copied</div>
        </div>
      ) : null}

      {isTrans ? (
        <div className="mx-auto backdrop-blur-sm bg-white/20 w-5/6 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
          <button onClick={copyToClipboard}>
            Copy the Summary <i className="fa fa-copy"></i>
          </button>
          <h1 className="text-white">{transcript}</h1>
        </div>
      ) : null}
    </>
  );
}

export default Summary;
