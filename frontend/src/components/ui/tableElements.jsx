import { Table } from "@chakra-ui/react";

 export function HeaderCell({children}){
    return(
        <Table.ColumnHeader
        fontSize={"3xl"}
        fontWeight={"bold"}
        p={3}
        borderBottom={"2px solid #e5e7eb"}
        >
            {children}
        </Table.ColumnHeader>
    )
}

export function TableCell({children}){
return(
    <Table.Cell
    fontSize={"2xl"}
    marginTop={"3"}
    p={3}
    borderBottom={"1px solid #f1f5f9"}
    cursor={"default"}
    >
        {children}
    </Table.Cell>
)
}

export function TableRow({children}){
     return(
        <Table.Row _hover={{bg: "#f8fafc"}}>
            {children}
        </Table.Row>
     )
}

