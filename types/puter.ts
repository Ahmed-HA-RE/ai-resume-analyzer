export type FSItem = {
  id: string;
  uid: string;
  name: string;
  path: string;
  is_dir: boolean;
  parent_id: string;
  parent_uid: string;
  created: number;
  modified: number;
  accessed: number;
  size: number | null;
  writable: boolean;
};

export type PuterUser = {
  uuid: string;
  username: string;
};

export type KVItem = {
  key: string;
  value: string;
};

export type ChatMessageContent = {
  type: 'file' | 'text';
  puter_path?: string;
  text?: string;
};

export type ChatMessage = {
  role: 'user' | 'assistant' | 'system';
  content: string | ChatMessageContent[];
};

export type PuterChatOptions = {
  model?: string;
  stream?: boolean;
  max_tokens?: number;
  temperature?: number;
  tools?: {
    type: 'function';
    function: {
      name: string;
      description: string;
      parameters: { type: string; properties: {} };
    }[];
  };
};

export type AIResponse = {
  index: number;
  message: {
    role: string;
    content: string | any[];
    refusal: null | string;
    annotations: any[];
  };
  logprobs: null | any;
  finish_reason: string;
  usage: {
    type: string;
    model: string;
    amount: number;
    cost: number;
  }[];
  via_ai_chat_service: boolean;
};
