export default function validateAvatar(picture, preview, errors) {
  if (picture.name == '') {
    errors['userPic'] = 'Please upload your avatar';
    return;
  }
  if (preview == null) {
    errors['userPic'] = 'Please crop your avatar';
  }
}
