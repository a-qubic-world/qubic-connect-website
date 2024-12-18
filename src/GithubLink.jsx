const GithubLink = ({link}) => {
  return (
    <div className="border-t-2 border-slate-600 flex justify-end mt-10 pt-2">
        <a 
            href={link}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-slate-400 text-slate-900 px-4 py-2 rounded"
        >
            Github Source
        </a>
    </div>
  )
}

export default GithubLink