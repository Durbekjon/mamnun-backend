import { IContactForm } from './IContact-form';

export class FindAllContactFormsResponseDto {
  contactForms: IContactForm[];
  business: number;
  edu: number;
  travel: number;
  other: number;
}
