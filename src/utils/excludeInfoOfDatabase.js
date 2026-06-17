export const excludeForUser = (user) => ({
  id: user.id,
  img: user.img,
  name: user.name,
  email: user.email,
  role: user.role,
  relationship: user.relationship,
  _exp: user._exp,
});
