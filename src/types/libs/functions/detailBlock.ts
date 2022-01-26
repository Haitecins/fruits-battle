interface DetailBlockProps {
  id: string;
  location: {
    x: number;
    y: number;
  };
  value: {
    before: number;
    after: number;
    suffix?: string;
  };
  extra?: () => unknown;
  fixed?: number;
}

export default DetailBlockProps;
