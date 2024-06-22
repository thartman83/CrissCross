import { useEffect, useRef } from "react";
import "./hiddenFileInput.css";
import { useCrossword } from "@/context/crosswordContext";
//import * as fs from 'fs';
import {Buffer} from 'buffer';

export type HiddenFileInputProps = {
  openLoadPuzzle: boolean,
  setOpenLoadPuzzle: (state: boolean) => void
};

const HiddenFileInput = ({openLoadPuzzle, setOpenLoadPuzzle}: HiddenFileInputProps) => {
  const puzFile = useRef<HTMLInputElement>(null);
  const {onLoad} = useCrossword();

  useEffect(() => {
    if(openLoadPuzzle) {
      puzFile.current?.click();
      setOpenLoadPuzzle(false);
    }

  }, [openLoadPuzzle]);

  const readFile = async (file: File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = res => {
        resolve(res.target?.result);
      };

      reader.onabort = err => reject(err);
      reader.readAsText(file);
    });
  };

  const changeHandler = async () => {
    const el = puzFile.current;
    if(!el || !el.files)
      return;

    const file = el.files[0];

    if(file) {
      debugger;
      const contents = await el.files[0].arrayBuffer();
      //const contents = fs.readFileSync(file);
      // reset the file load input
      el.value = '';
      onLoad(Buffer.from(contents));
    }
  };

  return (
    <div>
      <input type="file" ref={puzFile} className="hiddenFileInput"
             onChange={changeHandler}/>
    </div>
  );
};

export default HiddenFileInput;
