import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";

import { MentionsInput, Mention } from 'react-mentions'

import defaultStyle from './defaultStyle.js'


function AsyncGithubUserMentions() {
    const BASE_URL = process.env.REACT_APP_BASE_URL;

    const [value, setValue] = useState("");

    const users = [
        {
        id: "isaac",
        display: "Isaac Newton",
        },
        {
        id: "sam",
        display: "Sam Victor",
        },
        {
        id: "emma",
        display: "emmanuel@nobody.com",
        },
    ];

  return (
    <div className="App">
      <MentionsInput
        value={value}
        onChange={(e) => setValue(e.target.value)}>

        <Mention
          data={users} />
      </MentionsInput>
    </div>
  )
}

// const asExample = provideExampleValue('')

export default AsyncGithubUserMentions