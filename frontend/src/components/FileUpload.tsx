import {
  Box,
  Container,
  HStack,
  Toast,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FormState } from "../pages/QueuePage/JoinQueueModal";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

interface FileUploadProps {
  formState: FormState;
  setFormState: React.Dispatch<FormState>;
}

function FileUpload({ formState, setFormState }: FileUploadProps) {
  const toast = useToast();

  const onDrop = useCallback((files: any) => {
    if (files.length > 0) {
      let file = files[0];
      let extension = file.name.split(".").pop();
      console.log(extension);
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
            setFormState({
              ...formState,
              printTime: extractPrintTime(e.target.result),
            });
            console.log(extractPrintTime(e.target.result));
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

  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop,
  });

  // const files = acceptedFiles.map((file) => <li key={file}>{file}</li>);

  const styles = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <section className="container">
      <HStack
        borderRadius="lg"
        w="100%"
        h="xs"
        borderStyle="dashed"
        borderWidth="3px"
        justifyContent="center"
        {...getRootProps({ styles })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </HStack>
      <aside>
        <h4>Files</h4>
        {/* <ul>{files}</ul> */}
      </aside>
    </section>

    // <HStack
    // borderRadius="lg"
    // w="100%"
    // h="xs"
    // borderStyle="dashed"
    // borderWidth="3px"
    // justifyItems="center"
    // >
    //   <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
    //     {({ getRootProps, getInputProps }) => (
    //       <Box {...getRootProps()} alignItems="center">
    //         <input {...getInputProps()} />
    //         <p>Drag 'n' drop some files here, or click to select files</p>
    //       </Box>
    //     )}
    //   </Dropzone>
    // </HStack>
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

      printTime = `PT${totalSeconds}S`;
      break;
    }
  }
  return printTime;
}
