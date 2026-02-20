export const getParseJsonAddress = (
  jsonAddress: string | null | undefined
): string => {
  let addressDisplay = '';
  try {
    if (jsonAddress != null) {
      const addr = JSON.parse(jsonAddress);
      addressDisplay = `${addr.street || ''}${addr.city ? ', ' + addr.city : ''}`;
    }
  } catch {
    addressDisplay = String(jsonAddress ?? '');
  }

  return addressDisplay;
};
