import React from 'react';
import sortBy from 'lodash/sortBy';

import {defined} from 'app/utils';
import styled from '@emotion/styled';
import ContextData from 'app/components/contextData';
import AnnotatedText from 'app/components/events/meta/annotatedText';
import theme from 'app/utils/theme';

import {KeyValueListData} from './types';

type Props = {
  data?: Array<KeyValueListData>;
  onClick?: () => void;
  raw?: boolean;
  longKeys?: boolean;
  isContextData?: boolean;
  isSorted?: boolean;
};

const KeyValueList = ({
  data,
  isContextData = false,
  isSorted = false,
  raw = false,
  longKeys = false,
  onClick,
}: Props) => {
  if (!defined(data) || data.length === 0) {
    return null;
  }

  const getData = () => {
    if (isSorted) {
      return sortBy(data, [({key}) => key.toLowerCase()]);
    }
    return data;
  };

  return (
    <table className="table key-value" onClick={onClick}>
      <tbody>
        {getData().map(
          ({key, subject, value = null, meta, subjectIcon, subjectDataTestId}) => (
            <tr key={key}>
              <TableSubject className="key" wide={longKeys}>
                {subject}
              </TableSubject>
              <td className="val" data-test-id={subjectDataTestId}>
                {isContextData ? (
                  <ContextData
                    data={!raw ? value : JSON.stringify(value)}
                    meta={meta}
                    withAnnotatedText
                  >
                    {subjectIcon}
                  </ContextData>
                ) : (
                  <pre className="val-string">
                    {meta ? (
                      <AnnotatedText
                        value={value}
                        chunks={meta.chunks}
                        remarks={meta.rem}
                        errors={meta.err}
                      />
                    ) : (
                      value
                    )}
                    {subjectIcon}
                  </pre>
                )}
              </td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

const TableSubject = styled('td')<{wide?: boolean}>`
  @media (min-width: ${theme.breakpoints[2]}) {
    max-width: ${p => (p.wide ? '620px !important' : 'none')};
  }
`;

KeyValueList.displayName = 'KeyValueList';

export default KeyValueList;
