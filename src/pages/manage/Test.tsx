import React, { ChangeEvent, FC, useState } from 'react'

const Test: FC = () => {
  // ------------------- 输入框 --------------------------------
  const [text, setText] = useState<string>('lkk')
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    console.log(text)
    setText(event.target.value)
  }
  // ------------------- 输入框 --------------------------------

  // ------------------- 文本区域 --------------------------------
  const [textar, setTextarea] = useState<string>('lkk')
  function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
    console.log(textar)
    setTextarea(event.target.value)
  }
  // 识别换行
  function genHtml() {
    return { __html: textar.replaceAll('\n', '<br>') }
  }
  // ------------------- 文本区域 --------------------------------

  // ------------------- 单选框 --------------------------------
  const [gender, setGender] = useState('male')
  function handleRadioChange(event: ChangeEvent<HTMLInputElement>) {
    setGender(event.target.value)
  }
  // ------------------- 单选框 --------------------------------

  // ------------------- 复选框：单个 --------------------------------
  const [checked, setChecked] = useState(false)
  function handleCheckboxChangeOne(event: ChangeEvent<HTMLInputElement>) {
    setChecked(!checked)
    // setChecked(event.target.checked)
  }
  // ------------------- 复选框：单个 --------------------------------

  // ------------------- 复选框:多个 --------------------------------
  const [web, setWeb] = useState<string[]>(['React18'])
  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    // includes判断数组中是否存在：返回布尔值
    const isChecked = web.includes(event.target.value)
    setWeb(web => {
      if (isChecked) {
        // 如果已经存在,筛选掉
        return web.filter(item => item !== event.target.value)
      }
      // 否则，加进数组
      return [...web, event.target.value]
    })
  }
  // ------------------- 复选框 --------------------------------

  // ------------------- 下拉框 --------------------------------
  const [lang, setLang] = useState('js')
  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setLang(event.target.value)
  }
  // ------------------- 下拉框 --------------------------------

  function handleSumbit(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault() //阻止默认行为
    // js自己提交数据
  }

  return (
    <div>
      {/* form */}
      <form action="/api/post" onSubmit={handleSumbit}>
        <input type="text" name="key1" value="val1" />
        <br />
        <textarea name="key2" value="val2"></textarea>
        <br />
        <input type="hidden" name="key3" value="val3" />
        <button type="submit">提交</button>
      </form>

      <br />
      <br />

      {/* 下拉框 */}
      <select value={lang} onChange={handleSelectChange}>
        <option value="java">Java</option>
        <option value="js">JS</option>
        <option value="css">CSS</option>
      </select>

      <br />
      <br />

      {/* 复选框：多个*/}
      <label htmlFor="checkbox1">React</label>
      <input
        type="checkbox" // 多选框
        id="checkbox1" // 与label关联
        value="React18" // 值
        checked={web.includes('React18')} // 选中
        onChange={handleCheckboxChange}
      />
      <label htmlFor="checkbox2">Vue</label>
      <input
        type="checkbox"
        id="checkbox2"
        value="Vue3"
        checked={web.includes('Vue3')}
        onChange={handleCheckboxChange}
      />
      {/* 隐藏的表单项 */}
      <input type="hidden" name="qd" value={JSON.stringify(web)} />

      <br />
      <br />

      {/* 复选框:单个*/}
      <label htmlFor="checkbox1">React</label>
      <input type="checkbox" id="checkbox1" checked={checked} onChange={handleCheckboxChangeOne} />

      <br />
      <br />

      {/* 单选框*/}
      <div>
        <label htmlFor="radio1">男</label>
        <input
          type="radio" // 单选
          id="radio1" // 与label关联
          name="gender" // 分组名称
          value="male" // 值
          checked={gender === 'male'} // 选中
          onChange={handleRadioChange}
        />
        <label htmlFor="radio2">女</label>
        <input
          type="radio"
          id="radio2"
          name="gender"
          value="female"
          checked={gender === 'female'}
          onChange={handleRadioChange}
        />
      </div>

      <br />
      <br />

      {/* 文本区域*/}
      <textarea value={textar} onChange={handleTextareaChange} rows={4} />
      <div>{textar}</div>
      <p dangerouslySetInnerHTML={genHtml()} />

      <br />
      <br />

      {/* 输入框*/}
      <input value={text} onChange={handleChange} />
    </div>
  )
}

export default Test
