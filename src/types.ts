type IdentifyData = {
  [key: string]: any;
};

export type Hotjar = (operation: 'identify', userId: string, data: IdentifyData) => void;
