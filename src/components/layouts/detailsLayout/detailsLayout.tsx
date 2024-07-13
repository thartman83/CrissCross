import TextInput, {TextInputChangeEvent} from "@/components/ui/textInput/textInput";
import TextArea, {TextAreaChangeEvent} from "@/components/ui/textArea/textArea";
import { useCrossword } from "@/hooks/useCrossword";
import TabPanel, { TabPanelProps } from "@/components/containers/tabPanel/tabPanel";

const DetailsLayout = ({labeledBy, id, hidden}: TabPanelProps) => {
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
    <TabPanel labeledBy={labeledBy} id={id} hidden={hidden} >
      <TextInput label="Title:" defaultValue={crossword.title}
                 changeHandler={onTitleChangeHandler}/>
      <TextInput label="Author:" defaultValue={crossword.author}
                 changeHandler={onAuthorChangeHandler}/>
      <TextInput label="Copyright:" defaultValue={crossword.copyright}
                 changeHandler={onCopyrightChangeHandler}/>
      <TextArea label="Notes:" defaultValue={crossword.notes}
                 onChangeHandler={onNotesChangeHandler}/>
    </TabPanel>
  );
};

export default DetailsLayout;
