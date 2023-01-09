const UserTableAtt = (props) => {
  return (
    <tr>
      <td>{props.data.date}</td>
      <td>{props.data.check_in}</td>
      <td>{props.data.check_out}</td>
      <td>{props.data.status}</td>
    </tr>
  );
};

export default UserTableAtt;