const ApiUrl = process.env.NEXT_PUBLIC_API_URL;
const UIbaseURL = process.env.NEXT_PUBLIC_UI_URL;
const S3_BASE_URL = process.env.NEXT_PUBLIC_S3_BASE_URL;

export const openInNewTab = (url) => {
  const newWindow = window.open(
    UIbaseURL + url,
    '_blank',
    'noopener,noreferrer',
  );
  if (newWindow) newWindow.opener = null;
};
