export function User(name, role, id, email, password) {
  this.name = name;
  this.role = role;
  this._id = id;
}
export function Schedule(checked_at, student, teacherEmail, id) {
  this.checked_at = checked_at;
  this.id = id;
  this.student = student;
  this.teacherEmail = teacherEmail;
}
