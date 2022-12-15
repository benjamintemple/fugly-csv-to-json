import React, { CSSProperties } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { useCSVReader } from "react-papaparse";
import fileDownload from "js-file-download";
import "../styles/Home.module.css";

import { useState } from "react";
const styles = {
  csvReader: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  } as CSSProperties,
  browseFile: {
    width: "20%",
  } as CSSProperties,
  acceptedFile: {
    border: "1px solid #ccc",
    height: 45,
    lineHeight: 2.5,
    paddingLeft: 10,
    width: "80%",
  } as CSSProperties,
  remove: {
    borderRadius: 0,
    padding: "0 20px",
  } as CSSProperties,
  progressBarBackgroundColor: {
    backgroundColor: "red",
  } as CSSProperties,
};

export default function CSVReader() {
  const [data, setData] = useState(null);
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const { CSVReader } = useCSVReader();

  const handleDownload = (data: any) => {
    if (!downloaded) {
      setDownloaded(true);
      return fileDownload(JSON.stringify(data, null, 2), "data.json");
    }
  };

  return (
    <>
      <div>
        <h1>FUGLY™ CSV to JSON</h1>
        <p>Handled client-side-only so no data is sent across the network</p>
      </div>
      <CSVReader
        onUploadAccepted={(results: any) => {
          setData(results);
        }}
      >
        {({
          getRootProps,
          acceptedFile,
          ProgressBar,
          getRemoveFileProps,
        }: any) => (
          <>
            <div style={styles.csvReader}>
              <button
                type="button"
                {...getRootProps()}
                style={styles.browseFile}
              >
                Browse file
              </button>
              <div style={styles.acceptedFile}>
                {acceptedFile && acceptedFile.name}
              </div>
              <button {...getRemoveFileProps()} style={styles.remove}>
                Remove
              </button>
            </div>
            <ProgressBar style={styles.progressBarBackgroundColor} />
            {data && (
              <>
                {handleDownload(data)}
                <CopyToClipboard
                  text={JSON.stringify(data, null, 2)}
                  onCopy={() => setCopied(true)}
                >
                  <button>Copy to clipboard</button>
                </CopyToClipboard>
                {copied ? <span style={{ color: "red" }}>Copied.</span> : null}
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </>
            )}
          </>
        )}
      </CSVReader>
    </>
  );
}
