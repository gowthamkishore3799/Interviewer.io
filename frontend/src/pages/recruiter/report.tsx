import { Button, Card, Progress, Tabs, Typography } from "antd";
import { useState } from "react";
import { ROOT_URL } from "../../constants";
import type { KeyValue } from "../../interface/application.types";

const { Paragraph, Title } = Typography;

export function UserReport({
  analysis,
  interviewReport,
  interviewMetaData,
}: {
  analysis: KeyValue;
  interviewReport?: KeyValue;
  interviewMetaData?: string;
}) {
  const [showVideo, setShowVideo] = useState(false);

  const ATSTab = ({analysis}: {analysis:KeyValue}) =>{
    return (
    <div className="flex flex-col gap-10">
      <Card title="Overall Score" className="mt-4">
        <Progress
          type="circle"
          percent={Number(analysis.overall_score.score)}
          strokeColor="#52c41a"
        />
        <Paragraph className="mt-4">
          {analysis.overall_score.explanation}
        </Paragraph>
      </Card>

      {[
        "keyword_content_match",
        "experience_relevance_achievement",
        "ats_readability",
        "visual_layout_design",
        "grammar_consistency",
      ].map((key) => (
        <Card
          key={key}
          title={key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
        >
          <Progress percent={Number(analysis[key].score) * 10} />
          <Paragraph>{analysis[key].explanation}</Paragraph>
        </Card>
      ))}

      <Card title="Summary Feedback" className="mt-4">
        <Paragraph>{analysis.summary_feedback.explanation}</Paragraph>
      </Card>
    </div>
    )
  }

  const handlePlay = () => {
    setShowVideo(true);
  };

  const InterviewTab = ({
    interviewReport,
    interviewMetaData,
  }: {
    interviewReport: KeyValue;
    interviewMetaData?: string;
  }) => (
    <div className="flex flex-col gap-6">
      {Object.entries(interviewReport).map(([key, value]: [string, any]) => (
        <Card
          key={key}
          title={key
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        >
          <Paragraph>{value.explanation}</Paragraph>
        </Card>
      ))}

<Card title="Interview Recording">
        <Button onClick={handlePlay}>
          {showVideo ? "Reload Recording" : "Play Recording"}
        </Button>
        {showVideo && interviewMetaData && (
          <video
            controls
            src={`${ROOT_URL}/transcript/${interviewMetaData}`}
            style={{ marginTop: 16, width: "100%", maxHeight: "500px" }}
          />
        )}
      </Card>
    </div>
  );
  console.log(interviewReport, "REport./..")

  const items = [{
    key: "ats",
    label: "ATS Report",
    children: <ATSTab analysis={analysis}/>
  }]

  if(interviewReport){
    items.push({
      key: "interview",
      label: "Interview Report",
      children: <InterviewTab interviewReport={interviewReport} interviewMetaData={interviewMetaData}/>
    })
  }

  return (
    <div>
      <Title level={3}>Candidate Report</Title>
      <Tabs defaultActiveKey="ats" items={items}>
      </Tabs>
    </div>
  );
}
