import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import { translate } from 'react-i18next';

const searchControl = (props) => {
  const { t } = props;
  return (
      <FormGroup>
          <InputGroup>
              <FormControl type="text" placeholder={t('search.placeholder')} onChange={props.changed} value={props.text} />
              <InputGroup.Button>
                  <Button bsStyle="primary" onClick={props.canceled}>{t('common.btn.clear')}</Button>
              </InputGroup.Button>
          </InputGroup>
      </FormGroup>
  );
}

export default translate('translations')(searchControl);
