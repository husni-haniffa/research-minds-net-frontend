import { Card,CardHeader, CardTitle, CardContent, CardFooter} from '@/components/ui/card'
import { NewsResponse } from './news.types'
import { formatSriLankaDate } from '@/lib/format'

const NewsView = ({news} : {news: NewsResponse})  => {
  return (
    <Card className='w-w-full border-0 shadow-none' key={news._id}>
        <CardHeader>
            <CardTitle className='text-slate-800 text-lg max-w-sm line-clamp-2'>
                {news.title.slice(0,75)}
            </CardTitle>
        </CardHeader>
        <CardContent className='text-slate-600 leading-relaxed text-xs max-w-md line-clamp-6'>
            {news.content.slice(0,500)}
        </CardContent>
        <CardFooter className='text-sm'>
            <span className='font-semibold mr-3'>
                Created:
            </span>
            {formatSriLankaDate(news.createdAt)}
        </CardFooter>
    </Card>
  )
}

export default NewsView