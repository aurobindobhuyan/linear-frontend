const NoteTableHeader = () => {
   return (
     <div className="note-header">
       <h1>Notes</h1>
       <div>
         <input type="text" placeholder="Search Note" />
         <button>Add Note</button>
       </div>
     </div>
   );
 };
 
 export default NoteTableHeader;
 