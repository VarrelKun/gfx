import EditImage from '@/components/shared/EditImage';
import Loader from '@/components/shared/Loader';
import PostStats from '@/components/shared/PostStats';
import { Button } from '@/components/ui/button';
import { useUserContext } from '@/context/AuthProvider';
import { useGetPostById } from '@/lib/react-query/queriesAndMutations'
import { dateFormat } from '@/lib/utils';
import { Link, useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || '');
  const { user } = useUserContext();

  const handleDeletePost = () => {
    
  }


  return (
    <div className='post_details-container'>
      {isPending ? <Loader /> : (
        <div className='post_details-card'>
          <img 
            src={post?.imageUrl}
            alt={post?.caption || 'post title'}
            className='post_details-img'
          />
          <div className="post_details-info">
            <div className='flex-between w-full'>
              <Link to={`/profile/${post?.creator.$id}`} className='flex items-center gap-3'>
                <img 
                    src={post?.creator?.imageUrl || 'assests/icons/profile-plaholder.svg'}
                    alt={post?.creator.name || 'creator'}
                    className="rounded-full w-12 lg:h-12"
                />
                <div className="flex flex-col">
                  <p className="base-medium lg:body-bold text-light-1">
                      {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                        {dateFormat(post?.$createdAt || '' )}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                        {post?.location}
                    </p>
                  </div>
                </div>
              </Link>

              <div className='flex-center gap-2'>
                <Link 
                  to={`/update-post/${post?.$id}`} 
                  className={`${user?.id !== post?.creator.$id && 'hidden'}`}
                >
                  <EditImage />
                </Link>
                <Button 
                  onClick={() => handleDeletePost}
                  variant={'ghost'}
                  className={`ghost_details-delete_btn ${user?.id !== post?.creator.$id && 'hidden'}`}
                >
                  <img 
                    src='/assets/icons/delete.svg'
                    alt='delete'
                    width={24} 
                    height={24}
                  />
                </Button>
              </div>
            </div>
            <hr className='border w-full border- dark-4/80' />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
              <p>{post?.caption}</p>
              <ul>
                  {post?.tags.map((tag: string) =>{
                      return (
                          <li key={tag} className="text-light-3">#{tag}</li>
                      )
                  })}
              </ul>
            </div>
            <div className='w-full'>
              <PostStats post={ post } userId={user.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails