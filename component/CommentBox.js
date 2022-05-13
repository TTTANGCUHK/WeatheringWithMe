import { useState, useEffect } from "react"
import { Card, CardContent, Typography, TextField, FormControl, Button } from '@mui/material'
import axios from "axios"

export default function CommentBox({ locName, uid }) {
  const [comments, setComments] = useState([])
  const [reload, setReload] = useState(0)
  useEffect(() => {
    axios.post('/api/comment', { action: 'get', payload: locName }).then(res => {
      console.log(res.data.comments)
      setComments(res.data.comments)
    })
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
      <FormControl fullWidth variant="standard">
        <TextField id="commentBox" label="Comment about this place!" variant="outlined" />
        <Button variant="contained" onClick={handleComment}>Comment!</Button>
      </FormControl>
    </div>
  )
}