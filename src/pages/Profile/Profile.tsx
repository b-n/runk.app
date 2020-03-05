import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';

// Utils
import { useUser } from '../../stores';

// Components
import Title from '../../components/Title';
import { SVGId } from '../common/SVGId';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  large: {
    width: 200,
    height: 200,
    margin: 30,
  },
  icon: {
    paddingRight: '10px',
  },
});

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { user } = useUser();

  return (
    <>
      {
        user &&
        <>
          <Title>
            <SVGId id={user.id} width={26} height={26} className={classes.icon}/>
            {t('common:Profile')}
          </Title>
          <div className={`${classes.container} content`}>
            <Avatar alt={user.name} src={user.img} className={classes.large} variant="circle" />
            <TextField
              error={false}
              label={t('profile:Display Name')}
              defaultValue={user.name}
            />
          </div>
        </>
      }
    </>
  );
};

export default React.memo(Profile);
