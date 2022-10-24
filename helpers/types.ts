export type message = {
    user_id_sender:number,
    user_id_reciever:number,
    message:string,
    created_at:string,
    seen:boolean,
    last_message: boolean
  }
  
export type chat = {
    user_id:number,
    avatar_url:string,
    user_id_sender:number,
    user_id_reciever:number,
    username:string
  }
  
export type user = {
    user_id:number,
    username:string
}

export type notification = {
    to_user:number,
    from_user:number,
    seen:boolean,
    type:string,
    created_at:string
}
