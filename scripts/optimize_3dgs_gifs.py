import cv2
from PIL import Image
import os
import time

def video_to_gif(video_path, gif_path, target_width=640, target_fps=10, max_colors=112, start_sec=18.0, duration_sec=12.0):
    t0 = time.time()
    cap = cv2.VideoCapture(video_path)
    src_fps = cap.get(cv2.CAP_PROP_FPS)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    start_frame = int(start_sec * src_fps)
    end_frame = total_frames if duration_sec is None else min(total_frames, int((start_sec + duration_sec) * src_fps))
    
    step = max(1, int(round(src_fps / target_fps)))
    actual_fps = src_fps / step
    frame_duration_ms = int(1000 / actual_fps)
    
    cap.set(cv2.CAP_PROP_POS_FRAMES, start_frame)
    frames = []
    
    curr = start_frame
    while curr < end_frame:
        ret, frame = cap.read()
        if not ret:
            break
        if (curr - start_frame) % step == 0:
            h, w = frame.shape[:2]
            target_h = int(target_width * h / w)
            target_h = target_h if target_h % 2 == 0 else target_h + 1
            resized = cv2.resize(frame, (target_width, target_h), interpolation=cv2.INTER_AREA)
            rgb = cv2.cvtColor(resized, cv2.COLOR_BGR2RGB)
            pil_img = Image.fromarray(rgb)
            q_img = pil_img.quantize(colors=max_colors, method=Image.Quantize.MEDIANCUT)
            frames.append(q_img)
        curr += 1
    cap.release()
    
    if not frames:
        return False
        
    os.makedirs(os.path.dirname(gif_path), exist_ok=True)
    frames[0].save(
        gif_path,
        save_all=True,
        append_images=frames[1:],
        duration=frame_duration_ms,
        loop=0,
        optimize=True
    )
    size_mb = os.path.getsize(gif_path) / (1024 * 1024)
    print(f"Generated {gif_path}: {len(frames)} frames, {size_mb:.2f} MB in {time.time()-t0:.2f}s")
    return True

print("Optimizing 3DGS_Data01...")
video_to_gif("D:/Truescape_3DGS/caseStudy_01/00_raw_footage/3DGS_Data01.mp4", "public/assets/case1/3dgs_data01.gif", target_width=640, target_fps=10, max_colors=112, start_sec=18.0, duration_sec=12.0)

print("Optimizing 3DGS_Data02...")
video_to_gif("D:/Truescape_3DGS/caseStudy_01/00_raw_footage/3DGS_Data02.mp4", "public/assets/case1/3dgs_data02.gif", target_width=640, target_fps=10, max_colors=112, start_sec=19.0, duration_sec=12.0)
