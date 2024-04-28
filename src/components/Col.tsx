import { Col as AntCol } from 'antd';
import React, { Children } from 'react';

type Props = {
  children: Array<React.ReactNode> | React.ReactNode;
};

const Col = ({ children }: Props): React.ReactElement => {
  return (
    <AntCol span={4} xs={24} sm={12} md={7} lg={5} xl={5} xxl={5}>
      {Children.toArray(children)}
    </AntCol>
  );
};

export default Col;
