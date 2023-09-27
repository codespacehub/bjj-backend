interface RemoveCharacterStringProps {
  value: string;
}

export function removeCharacterString({ value }: RemoveCharacterStringProps) {
  return value.replace(/-/g, '');
}
