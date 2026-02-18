import "./usersTable.css"

function UsersTable ({users}){
    return(
        <table>
            <thead>
                <th>Email</th>
                <th>Acesso</th>
                <th>Id</th>
            </thead>

            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.id}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default UsersTable