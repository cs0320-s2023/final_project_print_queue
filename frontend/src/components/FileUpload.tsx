import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  HStack,
  useToast,
} from "@chakra-ui/react";
import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#bdbdbd",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle: React.CSSProperties = {
  borderColor: "#2196f3",
};

interface FileUploadProps {
  fileUploaded: boolean;
  setFileUploaded: React.Dispatch<boolean>;
  setPrintTime: React.Dispatch<string>;
}

function FileUpload({
  fileUploaded,
  setFileUploaded,
  setPrintTime,
}: FileUploadProps) {
  const toast = useToast();

  // onDrop Function used to process the file uploaded by the
  // user and extract the estimated print time.
  const onDrop = useCallback((files: any) => {
    if (files.length > 0) {
      let file = files[0];
      let extension = file.name.split(".").pop();
      if (extension !== "gcode") {
        toast({
          title: `File Type Not Supported: Make sure your file ends in with .gcode`,
          position: "top",
          status: "error",
          isClosable: true,
        });
        return "";
      } else {
        let reader = new FileReader();
        reader.readAsText(file);
        reader.addEventListener("load", (e) => {
          if (e.target !== null) {
            let printTime = extractPrintTime(e.target.result);
            setPrintTime(printTime);
            if (printTime === "") {
              toast({
                title: `Could not extract estimated print time. Please check your file is a valid .gcode file from Prusa Slicer`,
                position: "top",
                status: "error",
                isClosable: true,
              });
            } else {
              setFileUploaded(true);
            }
          } else {
            toast({
              title: `Could Not Read File: Please try uploading again.`,
              position: "top",
              status: "error",
              isClosable: true,
            });
          }
        });
      }
    }
  }, []);

  // useDropZone hook
  const { getRootProps, getInputProps, isFocused } = useDropzone({
    maxFiles: 1,
    onDrop: onDrop,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
    }),
    [isFocused]
  );

  if (fileUploaded) {
    return (
      <Alert
        status="success"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          File Time Extract Successfully!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          Click the submit button below to add your print job to the queue.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container">
      <HStack
        borderRadius="lg"
        w="100%"
        h="xs"
        borderStyle="dashed"
        borderWidth="3px"
        justifyContent="center"
        {...getRootProps({ style })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </HStack>
    </div>
  );
}

export default FileUpload;

function extractPrintTime(gcodeText: any) {
  const lines = gcodeText.split("\n");
  let printTime = "";
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("; estimated printing time (normal mode)")) {
      const timeString = lines[i].substring(lines[i].indexOf("=") + 1).trim();
      const [hours, minutes, seconds] = timeString.split(" ");
      const totalSeconds =
        parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
      printTime = totalSeconds.toString();
      break;
    }
  }
  return printTime;
}
