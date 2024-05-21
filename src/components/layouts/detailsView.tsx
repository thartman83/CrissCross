import TextInput, {TextInputChangeEvent} from "../ui/textInput";
import TextArea, {TextAreaChangeEvent} from "../ui/textArea";
import { useCrossword } from "@/hooks/useCrossword";

const DetailsView = () => {
  const {updateMetadata, crossword} = useCrossword();

  const onTitleChangeHandler = (e: TextInputChangeEvent) => {
    updateMetadata('title', e.currentTarget.value);
  };

  const onAuthorChangeHandler = (e: TextInputChangeEvent) => {
    updateMetadata('author', e.currentTarget.value);
  };

  const onCopyrightChangeHandler = (e: TextInputChangeEvent) => {
    updateMetadata('copyright', e.currentTarget.value);
  };

  const onNotesChangeHandler = (e: TextAreaChangeEvent) => {
    updateMetadata('notes', e.currentTarget.value);
  };

  return (
    <>
      <TextInput label="Title:" defaultValue={crossword.title}
                 onChangeHandler={onTitleChangeHandler}/>
      <TextInput label="Author:" defaultValue={crossword.author}
                 onChangeHandler={onAuthorChangeHandler}/>
      <TextInput label="Copyright:" defaultValue={crossword.copyright}
                 onChangeHandler={onCopyrightChangeHandler}/>
      <TextArea label="Notes:" defaultValue={crossword.notes}
                 onChangeHandler={onNotesChangeHandler}/>
    </>
  );
};

export default DetailsView;
