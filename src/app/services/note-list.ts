export type NoteList ={[key:number]: Note[]};

export type Note = {
  tile: number
  text: string;
  styles : {
    color: string,
    margin: string,
    rotate:string;
  };
};
