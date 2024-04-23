import axios from "axios";
import prisma from "../config/db.config.js"

class PostController {
    static async index(req,res){
        try{
            const posts = await prisma.post.findMany({});            
            let userIds = [];
            posts.forEach((item)=> userIds.push(item.user_id));

            const response = await axios.post(`${process.env.AUTH_MICRO_URL}/api/getUsers`, userIds);
         
            const users = {};
            response.data.users.forEach((item) =>{
                users[item.id] = item;
            })

            const postwithUsers =  await Promise.all(
                posts.map(async (post) => {
                    return {
                       ...post,
                        user: users[post.user_id]
                    }
                })
            )
           
            return res.status(200).json({postwithUsers})

        }catch(error){
            console.log(error);
              return res.status(500).json({message:"Something went wrong!!!"})
        }
    }

    static async store(req,res){
        const authUser = req.user;
        console.log(authUser, authUser.id);
        const {title, content } = req.body;
        try{
            const post = await prisma.post.create({
                data:{
                    user_id:authUser.id,
                    title,
                    content
                }
            })
            return res.status(201).json({message:"post created successfully!!!!",post});

        }catch(error){
            return res.status(500).json({message:"Something went wrong!!!"});

        }
    }
}

export default PostController;