import ReactOnRails from 'react-on-rails';
import InitialContainer from '../bundles/JDIgram/components/INIT/InitialContainer'
import InitialComponent from '../bundles/JDIgram/components/INIT/InitialComponent'
import UserEdit from '../bundles/JDIgram/components/UserEdit/UserEdit';
import RemoveAvatarButton from '../bundles/JDIgram/components/UserEdit/RemoveAvatarButton';
import UserEditForm from '../bundles/JDIgram/components/UserEdit/UserEditForm';
import Avatar from '../bundles/JDIgram/components/Avatar';
import AvatarInput from '../bundles/JDIgram/components/AvatarInput';
import AvatarCropModal from '../bundles/JDIgram/components/AvatarCropModal';
const images = require.context('../images', true)
import NavbarAvatarContainer from '../bundles/JDIgram/components/navbar/NavbarAvatarContainer';
import UserShowAvatarContainer from '../bundles/JDIgram/components/UserShow/UserShowAvatarContainer';


ReactOnRails.register({
  InitialContainer,
  InitialComponent,
  UserEdit,
  RemoveAvatarButton,
  UserEditForm,
  AvatarInput,
  AvatarCropModal,
  Avatar,
  NavbarAvatarContainer,
  UserShowAvatarContainer,
});




