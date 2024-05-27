"use server"
import prisma from "@/db"

interface props {
    id: number
}
//@ts-ignore
export const getUserDetails = async (id:number)=>{
    const user = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            name: true,
        }
    })
    return user;
}

export const getUsersDetails = async ()=>{
    const user = await prisma.user.findMany({
    })
    return user;
}