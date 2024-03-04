import { Text,Flex } from '@radix-ui/themes';
import React from 'react';
import { useDropzone, Accept} from 'react-dropzone';

interface dropzoneProps {
  label?: string;
  onDrop: (file: File[]) => void;
  fileType?: Accept;
}

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};
const focusedStyle = {
  borderColor: '#2196f3'
};
const acceptStyle = {
  borderColor: '#00e676'
};
const rejectStyle = {
  borderColor: '#ff1744'
};

const Dropzone: React.FC<dropzoneProps> = (props) => {
    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone({
      onDrop: (event) => {
        props.onDrop(event)
      },
      accept: props.fileType
    })

    const style:any = React.useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }),[
        isFocused,
        isDragAccept,
        isDragReject
    ])

    const acceptedFileItems = acceptedFiles.map((file:any) => (
      <li key={file.path}>
        <Text size={'1'}> {file.path} - {file.size} bytes </Text>
        
      </li>
    ));

    return <Flex direction={'column'}>
    <Text weight={'bold'}>{props.label}</Text>
      <div {...getRootProps({style})}>
          <input {...getInputProps()}/>
          <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div>
          <Text size={'2'} weight={'medium'}>Files:</Text>
          {acceptedFileItems}
      </div>
    </Flex>
}

export default Dropzone