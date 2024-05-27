"use server"
import db from "@/db"
import { authOptions } from "@/lib/auth"
import { getUserDetails } from "@/queries"
import { getServerSession } from "next-auth"

export const getUserDetailsAction = async ()=>{
    const session = await getServerSession(authOptions);
    //@ts-ignore
    const id = parseInt(session?.user.id)
    const userDetails = await getUserDetails(id)
    //@ts-ignore
    const name = userDetails.name;
    return {
        name
    }
}

export const getRandomUsersData  = async ()=>{
    const usersCount = await db.user.count();
    const skip = Math.floor(Math.random() * usersCount);
    const randomUsers = async ()=>{
        const user = await db.user.findMany({
            skip: skip,
            take: 10
        })
        return user;
    }
    return randomUsers();
}

interface Props {
    FriendName: string;
}
  
export const addFriend = async ({ FriendName }: Props) => {
    try {
      const session = await getServerSession(authOptions);
      if (!session) {
        throw new Error('Not authenticated');
      }
      const userID = session.user.id;
      const userId = parseInt(userID, 10);
      const user = await db.user.findUnique({
        where: { id: userId },
      });
      if (!user) {
        throw new Error(`User with ID ${userId} not found`);
      }
      const newFriend = await db.friend.create({
        data: {
          userId,
          name: FriendName,
        },
      });
  
      return newFriend;
    } catch (error) {
      console.error('Error adding friend:', error);
      throw new Error('Failed to add friend');
    }
  };