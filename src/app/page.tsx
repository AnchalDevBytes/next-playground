import Link from 'next/link';

const questions = [
  {
    id: 1,
    title: "InfinteScrollWithDebounce",
    link: "/InfiniteScrollWithDebounce"
  },
  {
    id: 2,
    title: "TicTacToe",
    link: "/tic-tac-toe"
  },
  {
    id: 3,
    title: "DebouncedTypeAhead",
    link: "/debouncedTypeAhead"
  },
  {
    id: 4, 
    title: "NestedComments",
    link: "/nestedComments"
  },
  {
    id: 5,
    title: "DynamicForm",
    link: "/dynamicForm"
  },
  {
    id: 6,
    title: "MultiSelectAutoSuggestInputTag",
    link: "/multiSelectAutoSuggestInputTag"
  },
  {
    id: 7,
    title: "CustomToastNotification",
    link: "/customToastNotification"
  },
  {
    id: 8, 
    title: "MultiSelectAutoSuggestInputTagTest",
    link: "/multiSelectAutoSuggestInputTagTest"
  },
  {
    id: 9,
    title: "Kanban",
    link: "kanban"
  }
]

const HomePage = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-10 p-20'>
      {questions.map((question) => {
        return (
          <Link 
            key={question.id}
            href={question.link}
            className='border p-4 rounded bg-gray-900 border-gray-700 cursor-pointer min-w-sm max-w-sm'
          >
            {question.title}
          </Link>
        )
      })}
    </div>
  )
}

export default HomePage