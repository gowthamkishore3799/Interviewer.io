export interface Application {
  name: string;
  email: string;
  candidateType: string;
  userId: string;
  resume: string;
  atsScore: KeyValue;
  feedback?: KeyValue;
  interviewMetaData?: string;
}


export interface KeyValue{
  [key: string]: ScoreComponent;
}


export interface ScoreComponent{
  explanation: string;
  score: string
}

export interface CancelInterviewModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}