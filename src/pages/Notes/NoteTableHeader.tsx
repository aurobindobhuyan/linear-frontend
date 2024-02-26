import CustomButton from "../../components/CustomButton";

const NoteTableHeader = () => {
   return (
     <div className="note-header">
       <h1>Notes</h1>
       <div>
         <input type="text" placeholder="Search Note" />
         <CustomButton text="Create Note" />
       </div>
     </div>
   );
 };
 
 export default NoteTableHeader;
 