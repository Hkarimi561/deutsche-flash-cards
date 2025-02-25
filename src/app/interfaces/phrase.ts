export interface Phrase {
  id?:string;
  title:string;
  description:string;
  seen:boolean;
  needToReview:boolean;
  hide:boolean;
  isOpen?:boolean;
  createdAt:Date;
  updatedAt:Date;
}
