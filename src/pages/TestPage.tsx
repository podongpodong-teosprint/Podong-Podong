import Svg from 'components/cores/Svg';

export default function TestPage() {
  return (
    <div>
      <h1>test page</h1>
      <Svg
        iconName="ic_arrow_line_18"
        svgProps={{
          width: '100px',
          height: '100px',
        }}
      ></Svg>
      <Svg iconName="ic_tune_24"></Svg>
    </div>
  );
}
