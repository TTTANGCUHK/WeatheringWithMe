import { useState, useEffect } from "react"
import { Card, CardContent, Typography, TextField, FormControl, Button, Container } from '@mui/material'
import axios from "axios"

export default function CommentBox({ locName, uid }) {
  const [comments, setComments] = useState([])
  const [reload, setReload] = useState(0)
  useEffect(() => {
    const fetchData = async() => {
      const res = await axios.post('/api/comment', { action: 'get', payload: locName })
      const fullComments = []
      for (const com of res.data.comments) {
        const resName = await axios.post('/api/user/retrieveName', { uid: com.uid })
        fullComments.push({ ...com, username: resName.data.username })
      }
      setComments(fullComments)
    }
    fetchData()
  }, [locName, reload])

  function handleComment(e) {
    e.preventDefault()
    let comment = document.getElementById("commentBox").value

    if (comment) {
      axios.post('/api/comment', { action: 'add', payload: { locName: locName, uid: uid, body: comment } })
        .then(res => {
          document.getElementById("commentBox").value = ""
          alert("Comment added")
          setReload(reload + 1)
        })
    } else {
      alert("Comment cannot be empty!")
    }
  }

  return (
    <div>
      {comments.map((comment, idx) => {
        return (
          <Card variant="outlined" key={idx}>
            <CardContent>
              <Typography variant="h6">
                {comment.username}
              </Typography>
              <Typography variant="body">
                {comment.body}
              </Typography>
              <Typography color="text.secondary">
                {comment.createdAt}
              </Typography>
            </CardContent>
          </Card>
        )
      })}
      <FormControl fullWidth variant="standard" sx={{ my: 2, p: 2 }}>
        <TextField id="commentBox" label="Comment about this place!" variant="outlined" />
        <Button variant="outlined" color="primary" sx={{ my: 2 }}onClick={handleComment}>Comment!</Button>
      </FormControl>
    </div>
  )
}