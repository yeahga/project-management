import stringLength from 'string-length';
import isEmail from 'validator/lib/isEmail';
import isEmpty from 'validator/lib/isEmpty';
import isMobilePhone from 'validator/lib/isMobilePhone';

import trim from '../../@libs/trim';

const MIN_POSITION_LENGTH = 5;
const MAX_POSITION_LENGTH = 100;

export default function validate(rawData: any) {
  const name = trim(rawData.name);
  const email = trim(rawData.email);
  const phone = trim(rawData.phone);
  const position = trim(rawData.position);
  const projectId = trim(rawData.projectId); // TODO: add a check for existence
  const type = 'developer';

  if (isEmpty(name)) return { error: 'Name is required' };
  if (!isEmail(email)) return { error: 'Email is not valid' };
  if (!isMobilePhone(phone)) return { error: 'Mobile phone is not valid' };
  if (
    stringLength(position) > MAX_POSITION_LENGTH ||
    stringLength(position) < MIN_POSITION_LENGTH
  ) {
    return {
      error: `Position name must be between ${MIN_POSITION_LENGTH} and ${MAX_POSITION_LENGTH} characters`,
    };
  }

  const data = {
    name,
    email,
    phone,
    position,
    projectId,
    type,
  };

  return { data };
}
