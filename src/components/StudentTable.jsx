const StudentTable = (props) =>{
    return(
                <tr>
                    <td>{props.student.date}</td>
                    <td>{props.student.nis}</td>
                    <td>{props.student.fullname}</td>
                    <td>{props.student.nomor_hp}</td>
                    <td>{props.student.check_in}</td>
                    <td>{props.student.check_out}</td>
                    <td>{props.student.status}</td>
                </tr>
    )
}

export default StudentTable;