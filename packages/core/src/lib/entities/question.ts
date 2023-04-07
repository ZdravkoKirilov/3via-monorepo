export type CreateAnswerDto = {
    title: string;
    points: number;
  };
  
  export type Answer = CreateAnswerDto & {
    id: number;
  };
  
  export type CreateQuestionDto = {
    title: string;
    hint?: string;
  };
  
  export type UpdateQuestionDto = CreateQuestionDto & {
    id: number;
    answers: Array<CreateAnswerDto | Answer>;
  };
  
  export type Question = Omit<UpdateQuestionDto, "answers"> & {
    answers: Answer[];
  
    createdAt: Date;
    updatedAt?: Date;
  };