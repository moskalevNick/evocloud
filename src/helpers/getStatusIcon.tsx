import React from 'react';

export const getStatusIcon = (group_id: string, t: any) => {
  const administratorStyles = {
    padding: '3px 12px',
    background: '#433B14',
    borderRadius: '5px',
    color: '#FF9D42',
    maxWidth: 'fit-content',
  };

  const distributorStyles = {
    padding: '3px 12px',
    background: '#1B6036',
    borderRadius: '5px',
    color: '#76E45A',
    maxWidth: 'fit-content',
  };

  const integratorStyles = {
    padding: '3px 12px',
    background: '#084B5B',
    borderRadius: '5px',
    color: '#0EDCDC',
    maxWidth: 'fit-content',
  };

  const userStyles = {
    padding: '3px 12px',
    background: '#043B6A',
    borderRadius: '5px',
    color: '#148ef8',
    maxWidth: 'fit-content',
  };

  switch (group_id) {
    case '1':
      return <div style={administratorStyles}>{t('administrator')}</div>;
    case '2':
      return <div style={integratorStyles}>{t('integrator')}</div>;
    case '3':
      return <div style={distributorStyles}>{t('distributor')}</div>;
    case '6':
    default:
      return <div style={userStyles}>{t('user')}</div>;
  }
};
