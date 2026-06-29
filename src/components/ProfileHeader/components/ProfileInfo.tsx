interface ProfileInfoProps {
  name: string
  bio?: string
}

const ProfileInfo = ({ name, bio }: ProfileInfoProps) => {
  return (
    <div className="text-center md:text-left">
      <h1 className="text-3xl font-semibold">{name}</h1>
      <p>{bio}</p>
    </div>
  )
}

export default ProfileInfo
